"use client";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  linkDialogPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  CreateLink,
  ListsToggle,
  linkPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "~/styles/mdxeditor.css";

export default function InitializedMDXEditor({
  editorRef,
  error,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps & {
    error: boolean;
  }) {
  return (
    <div
      className={`min-h-[252px] min-w-[722px] flex align-stretch border border-gray-5 rounded-[4px] ${error ? "error" : ""}`}
    >
      <MDXEditor
        contentEditableClassName="prose min-w-full min-h-full"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 divide-x divide-solid">
                  <div className="flex">
                    <BoldItalicUnderlineToggles options={["Bold"]} />
                    <BoldItalicUnderlineToggles options={["Italic"]} />
                    <BoldItalicUnderlineToggles options={["Underline"]} />
                  </div>
                  <div className="pl-2">
                    <CreateLink />
                  </div>
                  <div>
                    <ListsToggle options={["bullet", "number"]} />
                  </div>
                  <div>
                    <BlockTypeSelect />
                  </div>
                </div>
              </div>
            ),
          }),
        ]}
        {...props}
        ref={editorRef}
      />
    </div>
  );
}
