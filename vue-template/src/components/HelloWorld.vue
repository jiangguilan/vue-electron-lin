<template>
  <div class="hello">
    <h1>face-api.js</h1>
    <div class="video-box">
      <video ref="video"></video>
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      timeout: null,
      option: null
    }
  },

  mounted () {
    // return;
    let _this = this;
    // isDevEnv
    faceapi.nets.tinyFaceDetector.loadFromUri("/weights");
    faceapi.loadFaceLandmarkModel("/weights");
    // !isDevEnv
    //   faceapi.nets.tinyFaceDetector.loadFromUri("http://192.168.0.102:4449/weights");
    //   faceapi.loadFaceLandmarkModel("http://192.168.0.102:4449/weights");

    _this.option = new faceapi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5
    });

    // return console.log(faceapi);
    let video = _this.$refs.video;
    let w = video.offsetWidth, h = video.offsetHeight;

    navigator.mediaDevices.getUserMedia(
      {
        video: { width: w, height: h }
      }
    ).then((stream) => {

      if (stream) {
        video.srcObject = stream;
        setTimeout(() => {
          video.play();
          setTimeout(() => {
            _this.fnRunFaceLandmark();
          }, 300)
        }, 300)
      }
    })

  },

  methods: {
    // 人脸面部勘探轮廓识别绘制
    async fnRunFaceLandmark () {
      let videoEl = this.$refs.video, canvasEl = this.$refs.canvas;
      if (videoEl.paused) return clearTimeout(this.timeout);
      const result = await faceapi.detectSingleFace(
        videoEl, this.option
      ).withFaceLandmarks();
      console.log(result);
      if (result) {
        const dims = faceapi.matchDimensions(canvasEl, videoEl, true)
        const resizedResult = faceapi.resizeResults(result, dims)
        faceapi.draw.drawFaceLandmarks(canvasEl, resizedResult)
      }

      this.timeout = setTimeout(() => this.fnRunFaceLandmark());
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-box {
  width: 100%;
  height: 400px;
  background: #333;
  position: relative;
}
.video-box video {
  width: 100%;
  height: 100%;
}

.video-box canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
