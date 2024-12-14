export function createErrorResponse(status: number, message: string) {
    return {
      status,
      error: true,
      message,
    };
  }
  