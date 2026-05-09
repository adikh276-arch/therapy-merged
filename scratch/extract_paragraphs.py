import docx
import os

def read_paragraphs():
    file_path = r"d:\Downloads\Therapy Merged\Guided Series.docx"
    doc = docx.Document(file_path)
    
    with open("scratch/docx_content.txt", "w", encoding="utf-8") as f:
        for p in doc.paragraphs:
            if p.text.strip():
                f.write(p.text.strip() + "\n")

read_paragraphs()
print("Done writing to scratch/docx_content.txt")
