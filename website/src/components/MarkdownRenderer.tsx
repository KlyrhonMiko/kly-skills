import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none 
      prose-headings:font-bold prose-headings:text-heading 
      prose-p:text-body prose-li:text-body
      prose-a:text-primary hover:prose-a:text-primary-dark hover:prose-a:underline
      prose-img:rounded-xl prose-img:border prose-img:border-border-light
      prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-surface-elevated prose-pre:border prose-pre:border-border-light prose-pre:shadow-sm"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
