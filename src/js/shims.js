import { Buffer } from "buffer";
import process from "process";
import { StringDecoder } from "string_decoder";

window.Buffer = Buffer;
window.process = process;
window.StringDecoder = StringDecoder;
