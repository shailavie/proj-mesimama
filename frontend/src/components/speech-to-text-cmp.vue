

<template>
  <section>
    <el-button
      class="speech-to-text-btn"
      dark
      @click.stop.native.prevent="toggle ? endSpeechRecognition() : startSpeechRecognition()"
    >
      <el-icon>{{toggle ? 'mic_off' : 'mic'}}</el-icon>
    </el-button>
  </section>
</template>
    
<script>
let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = SpeechRecognition ? new SpeechRecognition() : false;

export default {
  props: {
    lang: {
      type: String,
      default: "en-US"
    },
    text: {
      type: [String, null],
      required: true
    }
  },
  data() {
    return {
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: "",
      sentences: []
    };
  },
  methods: {
    checkCompatibility() {
      if (!recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
      }
    },
    endSpeechRecognition() {
      recognition.stop();
      this.toggle = false;
      this.$emit("speechend", {
        sentences: this.sentences,
        text: this.sentences.join(". ")
      });
      setTimeout(() => {
        this.sentences = "";
      }, 1000);
    },
    startSpeechRecognition() {
      setTimeout(() => {
        console.log("Stopping recording afte 5s");
        this.endSpeechRecognition();
      }, 5000);
      if (!recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
        return false;
      }
      this.toggle = true;
      recognition.lang = this.lang;
      recognition.interimResults = true;

      recognition.addEventListener("speechstart", event => {
        this.speaking = true;
      });

      recognition.addEventListener("speechend", event => {
        this.speaking = false;
      });

      recognition.addEventListener("result", event => {
        const text = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");
        this.runtimeTranscription = text;
      });

      recognition.addEventListener("end", () => {
        if (this.runtimeTranscription !== "") {
          this.sentences.push(
            this.capitalizeFirstLetter(this.runtimeTranscription)
          );
          this.$emit(
            "update:text",
            `${this.text}${this.sentences.slice(-1)[0]}. `
          );
        }
        this.runtimeTranscription = "";
        recognition.stop();
        if (this.toggle) {
          // keep it going.
          recognition.start();
        }
      });
      recognition.start();
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  mounted() {
    this.checkCompatibility();
  }
};
</script>

<style lang="scss" scoped>
.speech-to-text-btn {
  border-radius: 50%;
  border: none;
  background: rgb(218, 217, 217) no-repeat center/50%
    url("https://static.thenounproject.com/png/2313-200.png");
  &:hover {
    background: rgb(235, 110, 110) no-repeat center/50%
      url("https://static.thenounproject.com/png/2313-200.png");
  }
}
</style>


