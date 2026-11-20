/**
 * Shared display config for message_templates.status.
 *
 * The DB stores Meta's raw enum (DRAFT / APPROVED / PENDING / REJECTED /
 * PAUSED / DISABLED / IN_APPEAL / PENDING_DELETION) — the UI maps it to
 * a human label + dark-theme badge classes here so the template manager,
 * inbox picker, and broadcast picker stay aligned.
 */

import type { MessageTemplateStatus } from '@/types';
import { getT } from '@/lib/i18n/translate';

export interface TemplateStatusDisplay {
  label: string;
  classes: string;
}

const t = getT('TemplateStatus');

export const templateStatusConfig: Record<
  MessageTemplateStatus,
  TemplateStatusDisplay
> = {
  DRAFT: {
    label: t('DRAFT'),
    classes: 'bg-muted/50 text-muted-foreground border-border',
  },
  PENDING: {
    label: t('PENDING'),
    classes: 'bg-status-warning/15 text-status-warning border-status-warning/30',
  },
  APPROVED: {
    label: t('APPROVED'),
    classes: 'bg-primary/15 text-primary border-primary/30',
  },
  REJECTED: {
    label: t('REJECTED'),
    classes: 'bg-status-critical/15 text-status-critical border-status-critical/30',
  },
  PAUSED: {
    label: t('PAUSED'),
    classes: 'bg-status-serious/15 text-status-serious border-status-serious/30',
  },
  DISABLED: {
    label: t('DISABLED'),
    classes: 'bg-status-critical/20 text-status-critical border-status-critical/40',
  },
  IN_APPEAL: {
    label: t('IN_APPEAL'),
    classes: 'bg-muted text-foreground border-border',
  },
  PENDING_DELETION: {
    label: t('PENDING_DELETION'),
    classes: 'bg-muted/70 text-muted-foreground border-border',
  },
};
