FROM bentoml/model-server:0.11.0

# Configure PIP install arguments, e.g. --index-url, --trusted-url, --extra-index-url
ARG EXTRA_PIP_INSTALL_ARGS=
ENV EXTRA_PIP_INSTALL_ARGS $EXTRA_PIP_INSTALL_ARGS

# copy over files needed for init script
COPY environment.yml requirements.txt setup.sh* bentoml-init.sh python_version* /bento/
WORKDIR /bento

# copy over entrypoint scripts
COPY docker-entrypoint.sh /usr/local/bin/

# Copy environment.yml, because bundled_pip_dependencies might not exist. This
# prevent COPY command from failing.
COPY environment.yml bundled_pip_dependencies*  /bento/bundled_pip_dependencies/

# Remove environment.yml from bundled_pip_dependencies directory
RUN rm /bento/bundled_pip_dependencies/environment.yml

# Execute permission for scripts
RUN chmod +x /bento/bentoml-init.sh /usr/local/bin/docker-entrypoint.sh

# Install conda, pip dependencies and run user defined setup script
RUN if [ -f /bento/bentoml-init.sh ]; then bash -c /bento/bentoml-init.sh; fi

# copy over model files
COPY . /bento

# the env var $PORT is required by heroku container runtime
ENV PORT 5000
EXPOSE $PORT

ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD ["bentoml", "serve-gunicorn", "/bento"]
