import React, { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="p-6 bg-destructive text-destructive-foreground rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-2">
            An unexpected error occurred. Please try again later.
          </p>
          {error && (
            <p className="text-sm font-mono text-muted-foreground">
              Error: {error.message}
            </p>
          )}
          {errorInfo && (
            <details className="mt-4 text-sm text-muted-foreground">
              <summary className="cursor-pointer">Details</summary>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return children;
  }
}
