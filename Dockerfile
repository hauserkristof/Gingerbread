# Use an Ubuntu 22.04 base image for x86-64
FROM --platform=linux/amd64 ubuntu:22.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install required tools and dependencies
RUN apt-get update && apt-get install -y \
  wget \
  tar \
  python3 \
  python3-pip \
  python3-setuptools \
  git \
  build-essential \
  curl \
  && apt-get clean

# Install Zig
RUN wget -q https://ziglang.org/download/0.12.1/zig-linux-x86_64-0.12.1.tar.xz \
  && tar -xf zig-linux-x86_64-0.12.1.tar.xz \
  && mv zig-linux-x86_64-0.12.1 /usr/local/zig \
  && ln -s /usr/local/zig/zig /usr/local/bin/zig \
  && rm zig-linux-x86_64-0.12.1.tar.xz

# Install Python dependencies
RUN pip3 install jinja2

# Set working directory
WORKDIR /app

# Copy your application files into the container
COPY . /app

# Default command to display Zig version and Python version
CMD ["bash"]
