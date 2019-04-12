This is a simple & bad javascript obfuscation technique. You would never do this to hide important source code as it clearly doesn't work. JS can essentially be represented using 6 characters and there are various ways of encoding the actual source. This just base64 encodes it and then evals it. To the naked eye it doesn't look like js, but trust me.. it is!

To find the flag all you need to do is either:

1. jsunfuck it (tools online)
2. Set a breakpoint and step through the code - the solution is obvious within a few steps into the code

flag{javascript-0bfusction}
