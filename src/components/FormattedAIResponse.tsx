import React from 'react';

interface FormattedAIResponseProps {
  content: string;
}

const FormattedAIResponse: React.FC<FormattedAIResponseProps> = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none text-foreground font-sans leading-relaxed">
      {content.split('\n').map((line, index) => {
        if (line.trim() === '') return <br key={index} />;

        // Headers like 🏗️ **App Structure:**
        const headerMatch = line.match(/^(.*) \*\*(.*):\*\*/);
        if (headerMatch) {
          return (
            <p key={index} className="font-semibold text-foreground mt-4 mb-2 flex items-center gap-2">
              <span>{headerMatch[1]}</span>
              <strong>{headerMatch[2]}:</strong>
            </p>
          );
        }

        // List items like • item
        if (line.trim().startsWith('•')) {
          return (
            <div key={index} className="flex items-start gap-2 ml-4">
              <span className="text-primary mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
              <span>{line.trim().substring(1).trim()}</span>
            </div>
          );
        }

        // Default paragraph
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
};

export default FormattedAIResponse;