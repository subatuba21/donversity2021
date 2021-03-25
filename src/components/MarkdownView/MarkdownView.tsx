import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MarkdownViewProps {
  file: string;
}

export default function MarkdownView({ file }: MarkdownViewProps) {
  const [raw, setRaw] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    const getFile = async () => {
      const res = await fetch(`/markdown/${file}.md`);
      const text = await res.text();

      if (isMounted) setRaw(text);
    };

    getFile();

    return () => {
      isMounted = false;
    };
  }, [file]);

  return <ReactMarkdown plugins={[gfm]}>{raw}</ReactMarkdown>;
}
