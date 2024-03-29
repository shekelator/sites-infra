### Sites-infra

Manage a VERY simple k8s cluster and other scripts or infrastructure code to keep my applications running. 

### Various things I had to do to get it set up in AWS
Most of these steps should eventually be automated, but making a note of them here so I don't forget all the things I did.

* Create EC1 instance
* Security groups and a load balancer needed to be set up, with correct targeting group, etc.
* Create a new certificate in ACM and validate it in the registrar using [DNS cert validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html)
* Create a new CNAME for the new endpoint
* Add a health check endpoint for the ALB to hit
* Install the [Cloudwatch agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC1Instance.html) on the EC2 instance
* In progress: [Configure Docker to send logs](https://docs.docker.com/config/containers/logging/awslogs/) to the cloudwatch agent (there must be a better way to do this)
* Allow logged in user to run docker daemon (necessary for running minkube?). To do this, add ec2-user to a group as described [here](https://linuxopsys.com/topics/add-user-to-docker-group).
* [Install minikube](https://bell-sw.com/announcements/2022/09/14/how-to-create-a-single-node-kubernetes-cluster/). Make sure to replace `amd64` with `arm64` since I'm on a ARM instance.
* Upgraded to t4g.small, because k8s is a resource hog
* Created log group /ruachreadings manually, because apparently it won't create it automatically?
* Added ingress-nginx to cluster with `minikube addons enable ingress`
* Added separate ingress-nginx.yaml file, not sure if it's necessary
* Intalled git on the ec2 instance, pulled down this repo
* TODO: try kong instead? https://minikube.sigs.k8s.io/docs/handbook/addons/kong-ingress/

Remaining things to do:
* Set it up so docker/minikube start on machine startup
* Continue setting up ingress based on [the ingress docs](https://kubernetes.io/docs/concepts/services-networking/ingress/) and [this tutorial](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)
* Install helm or some way to manage containers
* Install second app for personal website
* Separate out healthcheck into a diff container (if needed at all)

### For new instances
* Install docker-compose
* Install git
* Pull down this repo
* docker-compose up

### Useful docs

A couple links:
* https://jamesdefabia.github.io/docs/getting-started-guides/aws/
* https://aws.plainenglish.io/how-to-setup-a-kubernetes-cluster-with-aws-free-tier-and-a-free-domain-515d010ae456
* https://hostadvice.com/how-to/web-hosting/containers/how-to-use-docker-containers-with-aws-ec1-2/
* https://dev.to/cloudx/multi-arch-docker-images-the-easy-way-with-github-actions-5k54
* https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC1Instance.html

