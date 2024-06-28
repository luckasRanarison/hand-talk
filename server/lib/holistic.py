import cv2
import numpy as np
import mediapipe as mp


mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic


model = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)


def process(image):
    image.flags.writeable = False
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = model.process(image_rgb)
    image.flags.writeable = True
    pose = _extract_landmarks(results.pose_landmarks, 33)
    left_hand = _extract_landmarks(results.left_hand_landmarks, 21)
    right_hand = _extract_landmarks(results.right_hand_landmarks, 21)
    _draw_landmarks(image, results)

    return {
        "pose": pose.tolist(),
        "left_hand": left_hand.tolist(),
        "right_hand": right_hand.tolist(),
    }


def _draw_landmarks(image, results):
    mp_drawing.draw_landmarks(
        image,
        results.pose_landmarks,
        mp_holistic.POSE_CONNECTIONS,
        landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style(),
    )

    mp_drawing.draw_landmarks(
        image,
        results.left_hand_landmarks,
        mp_holistic.HAND_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
        mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2),
    )

    mp_drawing.draw_landmarks(
        image,
        results.right_hand_landmarks,
        mp_holistic.HAND_CONNECTIONS,
        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2),
    )


def _extract_landmarks(value, count):
    if value:
        points = [[res.x, res.y, res.z] for res in value.landmark]
        landmarks = np.array(points).flatten()
    else:
        landmarks = np.zeros(count * 3)
    return landmarks
