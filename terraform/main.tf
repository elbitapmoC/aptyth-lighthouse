provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "aptyth_lighthouse_bucket" {
  bucket = "aptyth-lighthouse-bucket"
  acl    = "private"

  tags = {
    Name        = "Aptyth Lighthouse Bucket"
    Environment = "Development"
  }
}

resource "aws_dynamodb_table" "aptyth_lighthouse_table" {
  name           = "aptyth-lighthouse-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name        = "Aptyth Lighthouse Table"
    Environment = "Development"
  }
}

resource "aws_iam_role" "aptyth_lighthouse_lambda_role" {
  name = "aptyth-lighthouse-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "Aptyth Lighthouse Lambda Role"
    Environment = "Development"
  }
}

resource "aws_iam_policy_attachment" "aptyth_lighthouse_lambda_policy" {
  name       = "aptyth-lighthouse-lambda-policy-attachment"
  roles      = [aws_iam_role.aptyth_lighthouse_lambda_role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "aptyth_lighthouse_function" {
  function_name = "aptyth-lighthouse-function"
  role          = aws_iam_role.aptyth_lighthouse_lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  filename         = "lambda_function.zip"
  source_code_hash = filebase64sha256("lambda_function.zip")

  environment {
    variables = {
      ENVIRONMENT = "Development"
    }
  }

  tags = {
    Name        = "Aptyth Lighthouse Lambda Function"
    Environment = "Development"
  }
}
