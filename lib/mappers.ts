export function mapLead(row: any) {
    return {
          id: row.id,
          name: row.name,
          phone: row.phone,
          email: row.email,
          address: row.address,
          adminNotes: row.admin_notes,
          status: row.status,
          category: row.category ?? null,
          preferredChannels: row.preferred_channels
            ? row.preferred_channels.split(",")
            : null,
          problemDescription: row.problem_description,
          additionalDetails: row.additional_details,
          timeline: row.timeline,
          startedAt: row.started_at,
          formCompletedAt: row.form_completed_at,
          estimateLow: row.estimate_low !== null ? Number(row.estimate_low) : null,
          estimateHigh: row.estimate_high !== null ? Number(row.estimate_high) : null,
          estimateNote: row.estimate_note,
          estimateSentAt: row.estimate_sent_at,
          clientResponse: row.client_response,
          clientResponseAt: row.client_response_at,
          createdAt: row.created_at,
    };
}

export function mapMedia(row: any) {
    return {
          id: row.id,
          leadId: row.lead_id,
          url: row.url,
          mediaType: row.media_type,
          createdAt: row.created_at,
    };
}

export const STATUS_LABELS: Record<string, string> = {
    link_sent: "Link Sent",
    started: "Started",
    form_completed: "Form Completed",
    estimate_sent: "Estimate Sent",
    approved: "Approved",
    declined: "Declined",
};

export const CATEGORY_LABELS: Record<string, string> = {
    maybe_later: "Maybe Later",
    not_interested: "Not Interested",
    need_more_info: "Need More Info",
    schedule_site_visit: "Schedule Site Visit",
};
