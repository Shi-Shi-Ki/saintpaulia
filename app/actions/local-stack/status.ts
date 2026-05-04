"use server"

import { ROUTE_SCHEMA } from "~/lib/config/route-schema"
import { getUrl } from "../setting"
import {
  LocalStackStatusDetail,
  LocalStackStatusSchema,
  OriginalLocalStackStatusSchema,
} from "./schema"

export async function status() {
  const localStackUrl = await getUrl()

  try {
    const result = await fetch(`${localStackUrl}/_localstack/health`, {
      cache: "no-store",
    })
    if (!result.ok) {
      throw new Error(`connection error. url: ${localStackUrl}`)
    }
    const rawData = OriginalLocalStackStatusSchema.parse(await result.json())
    if (!rawData || !rawData.services) {
      throw new Error(`no raw data. url: ${localStackUrl}`)
    }

    const transformedServices: Record<string, LocalStackStatusDetail> = {}
    Object.entries(rawData.services).forEach(([serviceName, statusValue]) => {
      transformedServices[serviceName] = {
        status: statusValue,
        image: imagePathMap[serviceName] ?? "/default.svg",
        link: linkPathMap[serviceName],
      }
    })
    const formattedData = {
      ...rawData,
      services: transformedServices,
    }

    return LocalStackStatusSchema.parse(formattedData)
  } catch (e) {
    console.error(e)

    throw e
  }
}

const imagePathMap: { [key: string]: string } = {
  acm: "/aws/service/security-identity-compliance/Arch_AWS-Certificate-Manager_64.svg",
  apigateway: "/aws/service/networking-content-delivery/Arch_Amazon-API-Gateway_64.svg",
  cloudformation: "/aws/service/management-governance/Arch_AWS-CloudFormation_64.svg",
  cloudwatch: "/aws/service/management-governance/Arch_Amazon-CloudWatch_64.svg",
  config: "/aws/service/management-governance/Arch_AWS-AppConfig_64.svg",
  dynamodb: "/aws/service/database/Arch_Amazon-DynamoDB_64.svg",
  dynamodbstreams: "/aws/service/database/Arch_Amazon-DynamoDB_64.svg",
  ec2: "/aws/service/compute/Arch_Amazon-EC2_64.svg",
  es: "/aws/service/analytics/Arch_Amazon-OpenSearch-Service_64.svg",
  events: "/aws/service/app-integration/Arch_Amazon-EventBridge_64.svg",
  firehose: "/aws/service/analytics/Arch_Amazon-Data-Firehose_64.svg",
  iam: "/aws/service/security-identity-compliance/Arch_AWS-Identity-and-Access-Management_64.svg",
  kinesis: "/aws/service/analytics/Arch_Amazon-Kinesis_64.svg",
  kms: "/aws/service/security-identity-compliance/Arch_AWS-Key-Management-Service_64.svg",
  lambda: "/aws/service/compute/Arch_AWS-Lambda_64.svg",
  logs: "/aws/service/management-governance/Arch_Amazon-CloudWatch_64.svg",
  opensearch: "/aws/service/analytics/Arch_Amazon-OpenSearch-Service_64.svg",
  redshift: "/aws/service/analytics/Arch_Amazon-Redshift_64.svg",
  "resource-groups": "/aws/service/management-governance/Arch_AWS-Service-Catalog_64.svg",
  resourcegroupstaggingapi: "/aws/service/management-governance/Arch_AWS-Service-Catalog_64.svg",
  route53: "/aws/service/networking-content-delivery/Arch_Amazon-Route-53_64.svg",
  route53resolver: "/aws/service/networking-content-delivery/Arch_Amazon-Route-53_64.svg",
  s3: "/aws/service/storage/Arch_Amazon-Simple-Storage-Service_64.svg",
  s3control: "/aws/service/storage/Arch_Amazon-Simple-Storage-Service_64.svg",
  scheduler: "/aws/service/app-integration/Arch_Amazon-EventBridge_64.svg",
  secretsmanager: "/aws/service/security-identity-compliance/Arch_AWS-Secrets-Manager_64.svg",
  ses: "/aws/service/business-applications/Arch_Amazon-Simple-Email-Service_64.svg",
  sns: "/aws/service/app-integration/Arch_Amazon-Simple-Notification-Service_64.svg",
  sqs: "/aws/service/app-integration/Arch_Amazon-Simple-Queue-Service_64.svg",
  ssm: "/aws/service/management-governance/Arch_AWS-Systems-Manager_64.svg",
  stepfunctions: "/aws/service/app-integration/Arch_AWS-Step-Functions_64.svg",
  sts: "/aws/service/security-identity-compliance/Arch_AWS-Identity-and-Access-Management_64.svg",
  support: "/aws/group/AWS-Cloud_32.svg",
  swf: "/aws/service/app-integration/Arch_AWS-Step-Functions_64.svg",
  transcribe: "/aws/service/artificial-intelligence/Arch_Amazon-Transcribe_64.svg",
}

const linkPathMap: { [key: string]: string } = {
  acm: "",
  apigateway: "",
  cloudformation: "",
  cloudwatch: "",
  config: "",
  dynamodb: ROUTE_SCHEMA["DYNAMODB_TABLES"].basePath,
  dynamodbstreams: "",
  ec2: "",
  es: "",
  events: "",
  firehose: "",
  iam: "",
  kinesis: "",
  kms: "",
  lambda: "",
  logs: ROUTE_SCHEMA["CLOUDWATCH_LOGS"].basePath,
  opensearch: "",
  redshift: "",
  "resource-groups": "",
  resourcegroupstaggingapi: "",
  route53: "",
  route53resolver: "",
  s3: "",
  s3control: "",
  scheduler: "",
  secretsmanager: "",
  ses: "",
  sns: "",
  sqs: "",
  ssm: "",
  stepfunctions: "",
  sts: "",
  support: "",
  swf: "",
  transcribe: "",
}
