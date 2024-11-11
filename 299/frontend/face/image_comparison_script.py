import cv2


def capture_image():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return None
    
    print("Press 's' to take the picture.")
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame.")
            break
        
        cv2.imshow("Live Feed - Press 's' to capture", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('s'):  
            captured_image = frame
            break
    
    cap.release()
    cv2.destroyAllWindows()
    return captured_image


def compare_images(image1, image2):
    
    gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
    
   
    orb = cv2.ORB_create()
    
    
    kp1, des1 = orb.detectAndCompute(gray1, None)
    kp2, des2 = orb.detectAndCompute(gray2, None)
    
    
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    
    
    matches = bf.match(des1, des2)
    matches = sorted(matches, key=lambda x: x.distance)
    

    threshold = 0.75  
    good_matches = [m for m in matches if m.distance < 50]  
    match_ratio = len(good_matches) / max(len(kp1), len(kp2))
    
    print(f"Match ratio: {match_ratio:.2f}")
    if match_ratio > threshold:
        print("The images match.")
    else:
        print("The images do not match.")


stored_image_path = 'stored_image.jpg'  
stored_image = cv2.imread(stored_image_path)

if stored_image is None:
    print("Error: Could not load the stored image.")
else:
    
    current_image = capture_image()
    
    if current_image is not None:
        
        compare_images(stored_image, current_image)
