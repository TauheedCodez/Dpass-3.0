import React, { useState } from "react";
import { Eye, Copy, Check } from "lucide-react";

function Display({ contract, account }) {
  const [data, setData] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const getData = async () => {
    if (!contract || !account) return;
    try {
      const result = await contract.display(account);
      if (result.length === 0) {
        alert("No saved password found.");
        return;
      }
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Passwords Button */}
      <button
        onClick={getData}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl flex items-center justify-center space-x-2"
      >
        <Eye className="w-5 h-5" />
        <span>View Passwords</span>
      </button>

      {data.length > 0 ? (
        <div className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600 mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Password
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700/20">
                  <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 font-mono bg-gray-800/50 px-3 py-1 rounded-lg">
                        {item.privateKey}
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.privateKey, index)}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        {copiedId === index ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          "Copy"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-4">No saved passwords yet.</p>
      )}
    </div>
  );
}

export default Display;