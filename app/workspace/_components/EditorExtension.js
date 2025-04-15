// import { Bold, Italic } from 'lucide-react';
// import React from 'react';

// function EditorExtension({ editor }) {
//   // Render nothing if editor is undefined
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className='p-5 '>
//       <div className="control-group">
//         <div className="button-group flex gap-3">
//           <button
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className={editor.isActive('bold') ? 'text-blue-600' : ''}
//           >
//             <Bold/>
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className={editor.isActive('italic') ? 'text-blue-600' : ''}
//           >
//             <Italic/>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditorExtension;

import { api } from "@/convex/_generated/api";
import { chatSession } from "@/utils/AiModel";
import { useAction } from "convex/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EditorExtension({ editor }) {
  // Render nothing if editor is undefined
  if (!editor) {
    return null;
  }
  const { fileId } = useParams();
  const SearchAi = useAction(api.myActions.search);

  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log(selectedText);

    const result = await SearchAi({
      query: selectedText,
      fileId: fileId,
    });

    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = "";
    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        AllUnformattedAns = AllUnformattedAns + item.pageContent;
      });

    const PROMPT =
      "For Question:" +
      selectedText +
      "please give appropriate answer in proper presentable format with headings gaps, spaces and bullet points in html format and also with the given content as answer.Also suggest the 3 important follow up questions that user can ask in bold format Also mention the 2 cases if you are weak in this topic ,then suggest relavent question and second case if you are strong or intermediate in the topic these are the suggested questions.The answer content is: " +
      AllUnformattedAns;
    // const PROMPT ="For Question:"+selectedText+" and with the given content as answer,"+
    // "please give appropriate answer .The answer content is: "+AllUnformattedAns

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
    const FinalAnswer = AiModelResult.response.text();

    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + "<p> <strong>Answer: </strong>" + FinalAnswer + "</p>"
    );
  };

  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-3 justify-between flex-wrap">
          {/* Bold */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-600" : ""}
          >
            <Bold />
          </button>

          {/* Italic */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-600" : ""}
          >
            <Italic />
          </button>

          {/* Underline */}
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-blue-600" : ""}
          >
            <Underline />
          </button>

          {/* Strikethrough */}
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "text-blue-600" : ""}
          >
            <Strikethrough />
          </button>

          {/* Heading */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-600" : ""
            }
          >
            <Heading />
          </button>

          {/* Bullet List */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-600" : ""}
          >
            <List />
          </button>

          {/* Ordered List */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-600" : ""}
          >
            <ListOrdered />
          </button>

          {/* Block Quote */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "text-blue-600" : ""}
          >
            <Quote />
          </button>

          {/* Undo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="text-blue-600"
          >
            <Undo />
          </button>

          {/* Redo */}
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="text-blue-600"
          >
            <Redo />
          </button>
          <button onClick={() => onAiClick()} className="text-blue-600">
            <Sparkles />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
