export type Decision = 'ALLOW' | 'DENY' | 'This is just a demo';

export interface PolicyResult {
    decision: Decision;
    reason?: string;
    modifiedAction?: string;
}

export interface SimulationInput {
    action: string;
    resource: string;
    branch: string;
    isCI: boolean;
    userParams: Record<string, string>;
}
