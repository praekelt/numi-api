from klein import Klein
from confmodel import Config
from confmodel.fields import ConfigInt

from numi_api.base import BaseWorker


class NumiApiConfig(Config):
    port = ConfigInt(
        "Port to listen on",
        default=8080)


class NumiApiWorker(BaseWorker):
    CONFIG_CLS = NumiApiConfig
    app = Klein()
