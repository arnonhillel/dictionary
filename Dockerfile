FROM "baseImage"

USER root

WORKDIR /some_dir

ADD . ./

EXPOSE 80

USER 1

ENTRYPOINT ["bash","-c"]
CMD ["npm start"]
