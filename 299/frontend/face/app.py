from flask import Flask, request, jsonify
import cv2
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Function to compare images
def compare_images(image1, image2):
    gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
    orb = cv2.ORB_create()
    kp1, des1 = orb.detectAndCompute(gray1, None)
    kp2, des2 = orb.detectAndCompute(gray2, None)
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(des1, des2)
    good_matches = [m for m in matches if m.distance < 50]
    match_ratio = len(good_matches) / max(len(kp1), len(kp2))
    return match_ratio

# Route to compare images
@app.route('/compare', methods=['POST'])
def compare():
    # Load the stored image
    stored_image_path = 'stored_image.jpg'  # Make sure this path is correct
    stored_image = cv2.imread(stored_image_path)

    # Get the uploaded image
    file = request.files['image']
    file.save('current_image.jpg')  # Save the uploaded image to a file
    current_image = cv2.imread('current_image.jpg')

    # Compare the images
    if current_image is not None and stored_image is not None:
        match_ratio = compare_images(stored_image, current_image)
        threshold = 0.75  # Define a threshold for a match
        result = "match" if match_ratio > threshold else "not match"
        return jsonify({'result': result, 'match_ratio': match_ratio})
    else:
        return jsonify({'error': 'Could not load images'}), 400

if __name__ == '__main__':
    app.run(debug=True)
