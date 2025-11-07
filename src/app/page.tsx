"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";

interface HeaderTemplate {
    name: string;
    description: string;
    template: string;
}

const headerTemplates: HeaderTemplate[] = [
    {
        name: "Standard",
        description: "Basic file header with author and date information",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *         Author: [Your Name]
 *           Date: ${new Date().toLocaleDateString()}
 *
 *        Summary: [Brief description]
 * 
 **************************************************************/`,
    },
    {
        name: "Assignment",
        description: "Perfect for school assignments and coursework",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *     Assignment: [Assignment Name]
 *         Author: [Your Name]
 *           Date: ${new Date().toLocaleDateString()}
 *
 *        Summary: [Brief description]
 * 
 **************************************************************/`,
    },
    {
        name: "Academic",
        description: "Comprehensive header for academic projects",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *       Course: [Course Name]
 *   Instructor: [Instructor Name]
 *         Date: ${new Date().toLocaleDateString()}
 *       Author: [Your Name]
 *
 *      Project: [Project Title]
 *     Filename: [filename]
 *  Description: 
 *    [A brief description of the file purpose and contents]
 *
 **************************************************************/`,
    },
    {
        name: "Personal",
        description: "For personal projects and side ventures",
        template: `/**************************************************************
 *
 *                        [filename]
 *
 *       Project: [Project Name]
 *       Created: ${new Date().toLocaleDateString()}
 *        Author: [Your Name]
 *
 *   Description:
 *   [A brief description of the file purpose and contents]
 *
**************************************************************/`,
    },
    {
        name: "Professional",
        description: "Professional template with version tracking",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *   Project Name: [Project Name]
 *         Module: [Module Name]
 *         Author: [Your Name]
 *           Date: ${new Date().toLocaleDateString()}
 *    Last Update: [Last Update Date]
 *        Version: 1.0.0
 *
 *   Summary:
 *   [A brief description of the file purpose and contents]
 * 
 **************************************************************/`,
    },
    {
        name: "Open Source",
        description: "For open source contributions and projects",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *   Open Source Project: [Project Name]
 *        Repository URL: [Repository URL]
 *           Contributor: [Your Name]
 *                  Date: ${new Date().toLocaleDateString()}
 *
 *   Description: 
 *   [A brief description of the file purpose and contents]
 *
 **************************************************************/`,
    },
    {
        name: "Minimal",
        description: "Clean and simple header for quick use",
        template: `/**************************************************************
 *
 *                [filename]
 *         Author: [Your Name]
 *           Date: ${new Date().toLocaleDateString()}
 *
 **************************************************************/`,
    },
    {
        name: "Detailed",
        description: "Comprehensive header with change log tracking",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *   Project Name: [Project Name]
 *         Module: [Module Name]
 *         Author: [Your Name]
 *           Date: ${new Date().toLocaleDateString()}
 *        Version: 1.0.0
 *
 *   Description: 
 *   [A brief description of the file purpose and contents]
 * 
 *   Change Log:
 *   - [Date]: [Description of changes]
 *   - [Date]: [Description of changes]
 *
 **************************************************************/`,
    },
    {
        name: "Machine Learning",
        description: "Specialized for ML and data science projects",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *      ML Project: [Project Name]
 *          Author: [Your Name]
 *            Date: ${new Date().toLocaleDateString()}
 *    Dataset Used: [Dataset Name]
 *       Algorithm: [Algorithm Name]
 *
 *   Description:
 *   [A brief description of the file purpose and contents]
 *
 **************************************************************/`,
    },
    {
        name: "Script",
        description: "For standalone scripts and utilities",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *      Script Name: [filename]
 *           Author: [Your Name]
 *             Date: ${new Date().toLocaleDateString()} 
 *
 *    Description: 
 *    [A brief description of what the script does]
 *
 *    Usage: 
 *    [How to run the script]
 *
 **************************************************************/`,
    },
    {
        name: "Test Suite",
        description: "For test files and test suites",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *    Test Suite: [Test Suite Name]
 *        Module: [Module Name]
 *        Author: [Your Name]
 *          Date: ${new Date().toLocaleDateString()}
 *
 *   Description:
 *   [A brief description of the tests in this file]
 * 
 *   Test Cases:
 *   - [Test Case 1]
 *   - [Test Case 2]
 *
 **************************************************************/`,
    },
    {
        name: "Web Development",
        description: "For web development projects with technology stack",
        template: `/**************************************************************
 *
 *                [filename]
 *
 *   Project Name: [Project Name]
 *         Module: [Module Name]
 *         Author: [Your Name]
 *           Date: ${new Date().toLocaleDateString()}
 *    Last Update: [Last Update Date]
 *
 *   Technologies Used:
 *   - [Technology 1]
 *   - [Technology 2]
 *
 *   Description: 
 *   [A brief description of the file purpose and contents]
 * 
 **************************************************************/`,
    },
];

export default function Home() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {/* <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" /> */}
                        <Image 
                            src="/icon.png" 
                            alt="Code Icon" 
                            width={32} 
                            height={32}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12" 
                        />
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white pl-1">
                            Header Templates
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                      Header documentation templates from Dan Glorioso's Header Hero VSCode Extension: {" "}
                      <a
                        href="https://danglorioso.com/header-hero"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        danglorioso.com/header-hero
                      </a>
                      .
                    </p>
                </div>

                {/* Template Grid */}
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                    {headerTemplates.map((template, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Template Header */}
                            <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {template.description}
                                </p>
                            </div>

                            {/* Template Code */}
                            <div className="relative">
                                <pre className="p-6 text-sm bg-gray-900 text-green-400 font-mono overflow-x-auto">
                                    <code>{template.template}</code>
                                </pre>

                                {/* Copy Button */}
                                <button
                                    onClick={() =>
                                        copyToClipboard(
                                            template.template,
                                            index
                                        )
                                    }
                                    className="absolute top-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center gap-2"
                                    title="Copy to clipboard"
                                >
                                    {copiedIndex === index ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span className="text-xs">
                                                Copied!
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span className="text-xs">
                                                Copy
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center mt-12 py-8 border-t border-gray-200 dark:border-slate-700">
                    <p className="text-gray-600 dark:text-gray-400">
                        Choose the template that best fits your project needs.
                        Remember to replace placeholders with your actual
                        information!
                    </p>
                </div>
            </div>
        </div>
    );
}
