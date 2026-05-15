'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-light.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-6 mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500 mb-2 mt-8 font-medium">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 mt-6">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-stone-800 dark:text-stone-300 leading-7 mb-4">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent no-underline hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-stone-900 dark:text-stone-100">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-stone-700 dark:text-stone-400">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="pl-4 mb-4 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="pl-4 mb-4 list-decimal space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-stone-800 dark:text-stone-300 leading-7 mb-1">
              {children}
            </li>
          ),
          hr: () => <hr className="border-stone-200 dark:border-stone-700 my-6 border-0 border-t" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-4 text-stone-500 dark:text-stone-400 italic text-sm my-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-1 py-0.5 rounded text-xs font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-stone-900 text-stone-100 p-4 rounded-lg overflow-x-auto text-xs font-mono mb-4">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            <img
              src={src || ''}
              alt={alt || ''}
              className="rounded-lg my-4 max-w-full h-auto"
              loading="lazy"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse border border-stone-200 dark:border-stone-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-stone-100 dark:bg-stone-800">{children}</thead>
          ),
          tr: ({ children }) => <tr className="border-b border-stone-200 dark:border-stone-700">{children}</tr>,
          th: ({ children }) => (
            <th className="border border-stone-200 dark:border-stone-700 px-3 py-2 text-left font-medium text-stone-900 dark:text-stone-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-stone-200 dark:border-stone-700 px-3 py-2 text-stone-800 dark:text-stone-300">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
