import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none 
      prose-headings:font-bold prose-headings:text-heading 
      prose-p:text-body prose-li:text-body
      prose-a:text-primary hover:prose-a:text-primary-dark hover:prose-a:underline
      prose-img:rounded-xl prose-img:border prose-img:border-border-light prose-img:inline-block prose-img:m-0
      prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-surface-elevated prose-pre:border prose-pre:border-border-light prose-pre:shadow-sm prose-pre:whitespace-pre-wrap prose-pre:break-words"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }: any) => {
            const { vAlign, style, ...rest } = props;
            const customStyle = { ...style };

            if (rest.height && !customStyle.height) {
              customStyle.height = isNaN(Number(rest.height)) ? rest.height : `${rest.height}px`;
              if (!rest.width && !customStyle.width) {
                customStyle.width = 'auto';
              }
            }
            if (rest.width && !customStyle.width) {
              customStyle.width = isNaN(Number(rest.width)) ? rest.width : `${rest.width}px`;
            }

            return <img {...rest} style={Object.keys(customStyle).length > 0 ? customStyle : undefined} valign={vAlign as string} />;
          },
          td: ({ node, ...props }: any) => {
            const { vAlign, ...rest } = props;
            return <td {...rest} valign={vAlign as string} />;
          },
          tr: ({ node, ...props }: any) => {
            const { vAlign, ...rest } = props;
            return <tr {...rest} valign={vAlign as string} />;
          },
          th: ({ node, ...props }: any) => {
            const { vAlign, ...rest } = props;
            return <th {...rest} valign={vAlign as string} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
