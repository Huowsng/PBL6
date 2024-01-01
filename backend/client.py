import json
import requests
import numpy as np
import sys

from utils import load_image, save_image

def main(args):
    img = load_image(args[0])
    img = np.expand_dims(img, 0)

    if img.shape[3] == 4:
        img = img[:, :, :, :3]

    data = json.dumps({"signature_name": "serving_default", "instances": img.tolist()})

    print('Data: {} ... {}'.format(data[:50], data[len(data)-52:]))

    headers = {"content-type": "application/json"}
    json_response = requests.post('https://aa3b-2402-800-6205-3a3b-59e8-93f8-e4db-fab9.ngrok-free.app/v1/models/srgan:predict', data=data, headers=headers)
    if json_response.status_code == 200:
        try:
            predictions = json.loads(json_response.text)['predictions']
            out = np.array(predictions, dtype=np.uint8)
            save_image(out[0], args[1])
        except json.decoder.JSONDecodeError as e:
            print(f"Error decoding JSON response: {e}")
    else:
        print(f"Error from API: {json_response.status_code} - {json_response.text}")

if __name__ == "__main__":
    main(sys.argv[1:])
