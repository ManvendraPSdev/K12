import { useState } from 'react';
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Alert from '../../components/common/Alert.jsx';
import { useDeleteInquiryMutation } from '../../store/api/inquiryApi.js';

export default function DeleteConfirmModal({
  inquiry,
  isOpen,
  onClose,
  onDeleteSuccess,
}) {
  const [deleteInquiry, { isLoading }] = useDeleteInquiryMutation();
  const [errorMessage, setErrorMessage] = useState(null);

  if (!inquiry) return null;

  const handleDelete = async () => {
    setErrorMessage(null);
    try {
      await deleteInquiry(inquiry.id).unwrap();
      onDeleteSuccess(
        `Inquiry from "${inquiry.name}" was deleted successfully.`,
      );
      onClose();
    } catch (err) {
      setErrorMessage(
        err?.data?.message || err?.message || 'Failed to delete inquiry. Please try again.',
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => {} : onClose}
      title="Confirm Inquiry Deletion"
      size="md"
      showCloseButton={!isLoading}
    >
      <div className="space-y-5">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 border border-rose-100">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Are you sure you want to delete this inquiry?
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              This action is permanent and cannot be undone. The record will be permanently purged from the database.
            </p>
          </div>
        </div>

        {errorMessage && (
          <Alert
            type="error"
            title="Deletion Failed"
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}

        {/* Target Inquiry Summary */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Name:</span>
            <span className="font-semibold text-slate-800">{inquiry.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Email:</span>
            <span className="font-semibold text-slate-800">{inquiry.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phone:</span>
            <span className="font-semibold text-slate-800">{inquiry.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">ID:</span>
            <span className="font-mono text-slate-600 truncate max-w-[200px]">{inquiry.id}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
          >
            Cancel
          </button>

          <Button
            type="button"
            variant="danger"
            loading={isLoading}
            icon={Trash2}
            onClick={handleDelete}
            className="text-xs py-2 px-4"
          >
            Delete Inquiry
          </Button>
        </div>
      </div>
    </Modal>
  );
}
