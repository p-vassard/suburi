export function createToast(title: string, subtitle: string, message: string) {
    const html = `<div role="alert" aria-live="assertive" aria-atomic="true" class="toast">
                   <div class="toast-header">
                     <strong class="me-auto">${title}</strong>
                     <small>${subtitle}</small>
                     <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                   </div>
                   <div class="toast-body">${message}</div>
                 </div>`;
    $('#toaster').append(html);
    $('#toaster>div:last').toast('show');
}