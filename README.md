


######TMUX#####
tmux
Run your backend server in the tmux session:


uvicorn main:app --host 0.0.0.0 --port 8000
Detach from the session (leaving the backend running): Press Ctrl+B, then D.

To reattach to the backend session later:

tmux attach

tmux ls 

tmux attach-session -t <session_number>