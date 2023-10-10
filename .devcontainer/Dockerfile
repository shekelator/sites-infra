FROM mcr.microsoft.com/devcontainers/typescript-node
RUN apt-get update

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm awscliv2.zip

RUN npm i -g aws-cdk
