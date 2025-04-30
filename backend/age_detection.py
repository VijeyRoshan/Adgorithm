from deepface import DeepFace

def detect_age(image_path):
    """Use DeepFace to analyze age from an image and classify it into groups."""
    try:
        # Perform age analysis
        result = DeepFace.analyze(image_path, actions=["age"], enforce_detection=False)
        
        # Extract predicted age
        predicted_age = result[0]["age"]

        # Classify into groups
        if predicted_age < 13:
            age_group = "Child (0-12)"
        elif 13 <= predicted_age < 20:
            age_group = "Teenager (13-19)"
        elif 20 <= predicted_age < 35:
            age_group = "Young Adult (20-34)"
        elif 35 <= predicted_age < 50:
            age_group = "Middle-aged Adult (35-49)"
        else:
            age_group = "Senior (50+)"
        
        return age_group
    
    except Exception as e:
        return f"Error detecting age: {e}"
