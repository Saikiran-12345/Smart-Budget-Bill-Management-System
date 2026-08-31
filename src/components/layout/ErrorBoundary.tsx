import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from '../ui/ErrorState';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React ErrorBoundary exception:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-md w-full">
            <ErrorState
              title="Something went wrong."
              message={this.state.error?.message || 'An unexpected rendering error occurred.'}
              onRetry={this.handleReset}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
