async function loadFaceAPI() {
  try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      console.log("FaceAPI models loaded successfully.");
  } catch (error) {
      console.error("Error loading FaceAPI models:", error);
      alert("Failed to load face detection models. Please reload the page.");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadFaceAPI();
  console.log("FaceAPI is ready to use!");
});

async function login(event) {
  event.preventDefault();
  const nid_no = document.getElementById('nid_no').value.trim();
  const phone_number = document.getElementById('phone_number').value.trim();
  const city = document.getElementById('city').value;
  const ward = document.getElementById('ward').value.trim();
  const password = document.getElementById('password').value.trim();

  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  const user = { nid_no, phone_number, city, ward, password };

  fetch('http://localhost:3000/user_check', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(res => {
      loader.style.display = 'none';
      if (res.vote_status === 0) {
          window.localStorage.setItem('nid_no', nid_no);
          window.localStorage.setItem('user', JSON.stringify(res.user));
          window.localStorage.setItem('city', city);
          window.localStorage.setItem('ward', ward);
          document.getElementById('face-verification').style.display = 'block';
          startVideo();
      } else if (res.vote_status === 1 && res.result_published) {
          window.localStorage.setItem('nid_no', nid_no);
          window.location.href = './result.html';
      } else {
          alert('User has already voted, but result is not published.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      loader.style.display = 'none';
      alert('An error occurred while processing your request.');
  });
}

function startVideo() {
  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => video.srcObject = stream)
      .catch(error => {
          console.error("Could not start video source:", error);
          alert("Unable to access the camera. Please check permissions and try again.");
      });
}

async function captureAndVerifyFace() {
  try {
      const video = document.getElementById('video');

      if (!faceapi.nets.tinyFaceDetector.isLoaded ||
          !faceapi.nets.faceLandmark68Net.isLoaded ||
          !faceapi.nets.faceRecognitionNet.isLoaded) {
          throw new Error("FaceAPI models are not fully loaded. Please reload the page.");
      }

      const userDescriptor = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

      if (!userDescriptor) {
          alert('No face detected. Please ensure your face is visible to the camera.');
          return;
      }

      const response = await fetch('http://localhost:3000/get_user_image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nid_no: localStorage.getItem('nid_no') })
      });

      if (!response.ok) throw new Error("Failed to retrieve stored face descriptor.");

      const data = await response.json();
      const storedDescriptor = new Float32Array(data.descriptor);
      const faceMatcher = new faceapi.FaceMatcher(storedDescriptor);
      const match = faceMatcher.findBestMatch(userDescriptor.descriptor);

      if (match.distance < 0.6) {
          alert('Face verification successful!');
          window.location.href = './dashboard.html';
      } else {
          alert('Face verification failed. Please try again.');
      }
  } catch (error) {
      console.error("Error during face verification:", error);
      alert(`Face verification error: ${error.message}`);
  }
}
