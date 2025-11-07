"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Check, Copy, ChevronDown } from "lucide-react";

interface HeaderTemplate {
    name: string;
    description: string;
    template: string;
}

interface CommentStyle {
    name: string;
    prefix: string;
    middle: string;
    suffix: string;
    borderChar: string;
    description: string;
}

const commentStyles: CommentStyle[] = [
    { name: "C/Java Style", prefix: "/*", middle: " *", suffix: " */", borderChar: "*", description: "/* ... */" },
    { name: "Hash/Python", prefix: "#", middle: "#", suffix: "#", borderChar: "#", description: "# ... #" },
    { name: "Double Slash", prefix: "//", middle: "//", suffix: "//", borderChar: "/", description: "// ... //" },
    { name: "Percent/LaTeX", prefix: "%", middle: "%", suffix: "%", borderChar: "%", description: "% ... %" },
    { name: "Double Dash", prefix: "--", middle: "--", suffix: "--", borderChar: "-", description: "-- ... --" },
    { name: "Double Quote", prefix: '""', middle: '""', suffix: '""', borderChar: '"', description: '"" ... ""' },
    { name: "HTML Comment", prefix: "<!--", middle: " -", suffix: " -->", borderChar: "-", description: "<!-- ... -->" },
    { name: "Haskell Style", prefix: "{-", middle: " -", suffix: " -}", borderChar: "-", description: "{- ... -}" },
];

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

const generateTemplate = (baseTemplate: string, commentStyle: CommentStyle): string => {
    const lines = baseTemplate.split('\n');
    const newLines = lines.map((line, index) => {
        if (index === 0) {
            // First line: /* + 62 asterisks = 64 chars total
            return line.replace('/**************************************************************', 
                commentStyle.prefix + commentStyle.borderChar.repeat(62));
        } else if (index === lines.length - 1) {
            // Last line: Only C/Java style has leading space
            if (commentStyle.name === "C/Java Style") {
                // C/Java: space + 62 asterisks + / = 64 chars total  
                return line.replace(' **************************************************************/', 
                    ' ' + commentStyle.borderChar.repeat(62) + '/');
            } else {
                // All other styles: no leading space, just borderChars + suffix
                if (line.includes(' **************************************************************/')) {
                    // Remove the leading space for non-C/Java styles
                    return commentStyle.borderChar.repeat(62) + commentStyle.suffix;
                } else {
                    return line.replace('**************************************************************/', 
                        commentStyle.borderChar.repeat(62) + commentStyle.suffix);
                }
            }
        } else if (line.trim().startsWith('*')) {
            // Middle lines: replace * with middle character
            return line.replace(' *', commentStyle.middle);
        }
        return line;
    });
    return newLines.join('\n');
};

export default function Home() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [selectedCommentStyle, setSelectedCommentStyle] = useState<CommentStyle>(commentStyles[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                {/* Comment Style Dropdown - Top right corner */}
                <div className="flex justify-end mb-4">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm hover:shadow-md transition-shadow text-xs text-gray-600 dark:text-gray-400"
                        >
                            <span>{selectedCommentStyle.name}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {dropdownOpen && (
                            <div className="absolute top-full mt-2 right-0 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-10 min-w-64">
                                {commentStyles.map((style, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedCommentStyle(style);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors border-b border-gray-100 dark:border-slate-700 last:border-b-0 ${
                                            selectedCommentStyle.name === style.name ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        <div className="font-medium">{style.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{style.description}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

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
                      Header documentation templates from Dan Glorioso&apos;s Header Hero VSCode Extension: {" "}
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
                                    <code>{generateTemplate(template.template, selectedCommentStyle)}</code>
                                </pre>

                                {/* Copy Button */}
                                <button
                                    onClick={() =>
                                        copyToClipboard(
                                            generateTemplate(template.template, selectedCommentStyle),
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
