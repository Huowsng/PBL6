# Sử dụng hình ảnh chứa TensorFlow Serving
FROM tensorflow/serving:latest

# Tạo thư mục /models/srgan trong container
RUN mkdir -p /models/srgan

# Sao chép các tệp của mô hình SRGAN vào thư mục /models/srgan trong container
COPY ./tmp/srgan /models/srgan

# Đặt biến môi trường MODEL_NAME
ENV MODEL_NAME srgan

# Chạy TensorFlow Serving khi container khởi chạy
CMD tensorflow_model_server --port=8501 --model_name=${MODEL_NAME} --model_base_path=/models/${MODEL_NAME}