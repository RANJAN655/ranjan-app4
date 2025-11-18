import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
}) {
  // Setup Quill
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
      },
    },
  });

  // Custom Image Upload Handler
  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = () => {
          const file = input.files[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", reader.result);
            quill.setSelection(range.index + 1);
          };
          reader.readAsDataURL(file);
        };
      });
    }
  }, [quill]);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          // Set initial content
          useEffect(() => {
            if (quill && value && quill.root.innerHTML !== value) {
              quill.root.innerHTML = value;
            }
          }, [quill, value]);

          // On content change
          useEffect(() => {
            if (quill) {
              quill.on("text-change", () => {
                onChange(quill.root.innerHTML);
              });
            }
          }, [quill]);

          return (
            <div
              className="bg-white text-black"
              style={{
                minHeight: "200px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <div ref={quillRef} />
            </div>
          );
        }}
      />
    </div>
  );
}
