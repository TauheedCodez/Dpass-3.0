import React from "react";
import { useForm } from "react-hook-form";
import { Save, Eye, EyeOff } from "lucide-react";

function TextUpload({ account, contract }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!account || !contract) {
      alert("Connect MetaMask first!");
      return;
    }

    try {
      setIsSubmitting(true);
      await contract.add(account, data.title, data.privateKey);
      alert("Password saved successfully!");
      reset();
      setShowPassword(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Enter Title
        </label>
        <input
          type="text"
          disabled={!account}
          {...register("title", { required: "Title is required" })}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500"
          placeholder="e.g. Gmail, Instagram..."
        />
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Enter Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            disabled={!account}
            {...register("privateKey", { required: "Password is required" })}
            className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your password..."
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.privateKey && (
          <p className="text-red-400 text-sm">{errors.privateKey.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-6 rounded-xl flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        <span>{isSubmitting ? "Saving..." : "Save Password"}</span>
      </button>
    </form>
  );
}

export default TextUpload;