# Sử dụng ảnh TensorFlow Serving làm base image
FROM tensorflow/serving

# Thiết lập thư mục làm việc
WORKDIR /models/srgan

# Sao chép model vào thư mục làm việc trong container
COPY ./tmp/srgan /models/srgan

# Thiết lập biến môi trường
ENV MODEL_NAME=srgan

# Thiết lập người dùng root
USER root

# Mở cổng 8501
EXPOSE 8501

# Chạy lệnh khi container được khởi chạy
CMD ["tensorflow_model_server", "--port=8501", "--model_name=${MODEL_NAME}", "--model_base_path=/models/${MODEL_NAME}"]