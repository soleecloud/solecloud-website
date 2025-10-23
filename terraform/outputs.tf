output "website_bucket_name" {
  description = "Name of the S3 bucket hosting the website"
  value       = aws_s3_bucket.website.id
}

output "website_bucket_arn" {
  description = "ARN of the S3 bucket hosting the website"
  value       = aws_s3_bucket.website.arn
}

output "website_bucket_endpoint" {
  description = "Website endpoint for the S3 bucket"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.arn
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "URL of the website"
  value       = "https://${var.domain_name}"
}

output "www_website_url" {
  description = "URL of the www subdomain"
  value       = var.www_domain_name != "" ? "https://${var.www_domain_name}" : "N/A"
}

output "certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.website.arn
}

output "route53_zone_id" {
  description = "Route53 hosted zone ID"
  value       = data.aws_route53_zone.main.zone_id
}

output "route53_name_servers" {
  description = "Route53 name servers for the domain"
  value       = data.aws_route53_zone.main.name_servers
}

output "logs_bucket_name" {
  description = "Name of the S3 bucket for logs"
  value       = var.enable_logging ? aws_s3_bucket.logs[0].id : "Logging disabled"
}

output "deployment_commands" {
  description = "Commands to deploy your website"
  value = <<-EOT
    # Build your Next.js application
    npm run build
    
    # Export to static files (if using static export)
    npm run export
    
    # Sync files to S3
    aws s3 sync out/ s3://${aws_s3_bucket.website.id} --delete
    
    # Invalidate CloudFront cache
    aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.website.id} --paths "/*"
  EOT
}




















