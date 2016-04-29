from twisted.web.server import Site
from twisted.application import strports

from numi_api.base import BaseOptions, BaseService
from numi_api.worker import NumiApiWorker


class Options(BaseOptions):
    pass


class Service(BaseService):
    WORKER_CLS = NumiApiWorker


def makeService(options):
    service = Service.from_options(options)
    site = Site(service.worker.app.resource())

    strports_service = strports.service(str(service.worker.config.port), site)
    strports_service.setServiceParent(service)

    return service
