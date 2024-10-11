import { useEffect, useRef, useState } from "react";
import { LANG } from "../enums/lang";

type SpeectToTextProps = {
  continuous?: boolean;
  lang?: LANG;
};
const useSpeechToText = ({ continuous = true, lang }: SpeectToTextProps) => {
  const [transcript, setTranscript] = useState<string>("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web not supported");
      return;
    }

    recognitionRef.current = new (window.webkitSpeechRecognition as typeof webkitSpeechRecognition)();
    const recognition = recognitionRef.current;

    recognition.interimResults = true;
    recognition.lang = lang ? lang : "vi-VN";
    recognition.continuous = continuous;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = () => {
      alert("Speech Recognition Error");
    };

    recognition.onend = () => {
      // setTranscript("");
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [continuous, lang]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const clearTransript = () => {
    setTranscript("");
  };

  return {
    transcript,
    startListening,
    stopListening,
    clearTransript,
  };
};

export default useSpeechToText;
