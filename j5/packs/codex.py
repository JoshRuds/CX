import tkinter as tk
from tkinter import filedialog, messagebox
import sys
import os
import threading

from sc import sc

class ScriptRunnerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Script Runner GUI")
        self.runner = None  # You set this externally: gui.runner = jcode()
        self.running_thread = None

        self.create_widgets()

    def create_widgets(self):
        btn_frame = tk.Frame(self.root)
        btn_frame.pack(fill=tk.X, padx=5, pady=5)

        btns = [
            ("Select .sc File", self.load_script),
            ("Run Script", self.run_script),
            ("Stop Script", self.stop_script),
            ("Clear Output", self.clear_output),
            ("Show Variables", self.show_variables),
            ("Show Functions", self.show_functions),
            ("Save Script", self.save_script),
            ("Show Syntax", self.show_syntax),
        ]

        for label, cmd in btns:
            tk.Button(btn_frame, text=label, command=cmd).pack(side=tk.LEFT, padx=2)

        self.editor = tk.Text(self.root, wrap=tk.NONE, height=20)
        self.editor.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        self.output = tk.Text(self.root, wrap=tk.NONE, height=10, bg="black", fg="white")
        self.output.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

    def load_script(self):
        path = filedialog.askopenfilename(filetypes=[("Script files", "*.sc")])
        if path:
            with open(path, 'r') as f:
                self.editor.delete("1.0", tk.END)
                self.editor.insert(tk.END, f.read())

    def save_script(self):
        path = filedialog.asksaveasfilename(defaultextension=".sc", filetypes=[("Script files", "*.sc")])
        if path:
            with open(path, 'w') as f:
                f.write(self.editor.get("1.0", tk.END))

    def run_script(self):
        if not self.runner:
            messagebox.showerror("Error", "Runner (jcode instance) not assigned.")
            return

        code = self.editor.get("1.0", tk.END)

        def run_in_thread():
            # Redirect output
            class StdRedirector:
                def __init__(self, write_func):
                    self.write_func = write_func

                def write(self, text):
                    if text.strip():
                        self.write_func(text.strip())

                def flush(self):  # Needed for file-like behavior
                    pass

            # Save originals
            original_stdout = sys.stdout
            original_stderr = sys.stderr

            sys.stdout = StdRedirector(self.append_output)
            sys.stderr = StdRedirector(self.append_output)

            try:
                self.runner.run(code)
            except Exception as e:
                self.append_output(f"[ERROR] {e}")
            finally:
                sys.stdout = original_stdout
                sys.stderr = original_stderr

        self.running_thread = threading.Thread(target=run_in_thread, daemon=True)
        self.running_thread.start()

    def stop_script(self):
        if self.runner:
            self.append_output("Script force-stopped.")
            os._exit(0)  # Replace with self.runner.stop() if supported

    def clear_output(self):
        self.output.delete("1.0", tk.END)

    def show_variables(self):
        if not self.runner:
            return
        out = "\n".join(f"{k} = {v}" for k, v in self.runner.vars.items())
        messagebox.showinfo("Variables", out or "No variables defined.")

    def show_functions(self):
        if not self.runner:
            return
        out = "\n\n".join(f"{name}:\n  " + "\n  ".join(body) for name, body in self.runner.functions.items())
        messagebox.showinfo("Functions", out or "No functions defined.")

    def show_syntax(self):
        if not os.path.exists("syntax.txt"):
            messagebox.showerror("Missing File", "syntax.txt not found.")
            return
        with open("syntax.txt") as f:
            syntax = f.read()
        win = tk.Toplevel(self.root)
        win.title("Syntax Help")
        txt = tk.Text(win, wrap=tk.WORD)
        txt.insert(tk.END, syntax)
        txt.config(state=tk.DISABLED)
        txt.pack(fill=tk.BOTH, expand=True)

    def append_output(self, text):
        self.output.insert(tk.END, text + "\n")
        self.output.see(tk.END)

root = tk.Tk()
gui = ScriptRunnerGUI(root)
gui.runner = sc()
root.mainloop()