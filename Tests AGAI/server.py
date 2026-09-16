#!/usr/bin/env python3
"""
AI & LLM Coding Arena - Local Development Server
Threading HTTP server to preview and test the coding platform in your browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output across all platforms
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DEFAULT_PORT = int(os.environ.get("PORT", 3090))

def find_available_port(start_port=3090, max_attempts=20):
    if "PORT" in os.environ:
        return int(os.environ["PORT"])
    import socket
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
    return start_port

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = find_available_port(DEFAULT_PORT)

    class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            # Enable CORS and disable aggressive caching for local testing
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            super().end_headers()

    class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        daemon_threads = True
        allow_reuse_address = True

    with ThreadedHTTPServer(("", port), CustomHTTPHandler) as httpd:
        url = f"http://localhost:{port}/index.html"
        print("=" * 65)
        print("  [*] AI & LLM Systems Coding Arena")
        print(f"  [+] Server running at: {url}")
        print("  [*] Press Ctrl+C to stop the server")
        print("=" * 65)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")

if __name__ == '__main__':
    run_server()
