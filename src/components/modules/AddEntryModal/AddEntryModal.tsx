'use client';

import { useState } from 'react';
import { TimesheetEntry } from '@/types/timesheet.types';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<TimesheetEntry>) => void;
  date?: string;
  initialData?: {
    projectName?: string;
    workType?: string;
    description?: string;
    hours?: number;
    date?: string;
  };
}

import { PROJECTS, WORK_TYPES } from '@/constants/timesheet.constants';

export function AddEntryModal({ isOpen, onClose, onSubmit, date, initialData }: AddEntryModalProps) {
  const [formData, setFormData] = useState({
    projectName: initialData?.projectName || '',
    workType: initialData?.workType || '',
    description: initialData?.description || '',
    hours: initialData?.hours !== undefined ? String(initialData.hours) : '12',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});



  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectName) {
      newErrors.projectName = 'Project is required';
    }
    if (!formData.workType) {
      newErrors.workType = 'Work type is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }
    const parsedHours = parseFloat(formData.hours);
    if (isNaN(parsedHours) || parsedHours <= 0) {
      newErrors.hours = 'Hours must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,
      hours: parseFloat(formData.hours) || 0,
      date: date || new Date().toISOString().split('T')[0],
    });

    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      projectName: '',
      workType: '',
      description: '',
      hours: '12',
    });
    setErrors({});
    onClose();
  };

  const incrementHours = () => {
    setFormData((prev) => ({ ...prev, hours: String(Math.min((parseFloat(prev.hours) || 0) + 1, 24)) }));
  };

  const decrementHours = () => {
    setFormData((prev) => ({ ...prev, hours: String(Math.max((parseFloat(prev.hours) || 0) - 1, 0)) }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Add New Entry"
      size="custom"
      width="646px"
      height="auto"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Select Project */}
        <div className="space-y-2">
          <Label htmlFor="projectName">
            Select Project <span className={errors.projectName ? "text-red-500" : "text-black"}>*</span>
            <svg className="inline-block w-3.5 h-3.5 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </Label>
          <Select
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            error={!!errors.projectName}
            className="[&>option]:cursor-pointer w-full sm:max-w-[385px]"
          >
            <option value="" className="text-[#6B7280]">Project Name</option>
            {PROJECTS.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </Select>
          {errors.projectName && (
            <p className="text-xs text-[#F05252]">{errors.projectName}</p>
          )}
        </div>

        {/* Type of Work */}
        <div className="space-y-2">
          <Label htmlFor="workType">
            Type of Work <span className={errors.workType ? "text-red-500" : "text-black"}>*</span>
            <svg className="inline-block w-3.5 h-3.5 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </Label>
          <Select
            id="workType"
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            error={!!errors.workType}
            className="[&>option]:cursor-pointer w-full sm:max-w-[385px]"
          >
            <option value="" className="text-[#6B7280]">Bug fixes</option>
            {WORK_TYPES.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </Select>
          {errors.workType && <p className="text-xs text-[#F05252]">{errors.workType}</p>}
        </div>

        {/* Task Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Task description <span className={errors.description ? "text-red-500" : "text-black"}>*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write text here ..."
            error={!!errors.description}
            className="w-full sm:max-w-[494px] h-[163px] rounded-lg px-4 py-3"
          />
          <p className="text-xs leading-[150%] text-[#6B7280]">A note for extra info</p>
          {errors.description && <p className="text-xs text-[#F05252]">{errors.description}</p>}
        </div>

        {/* Hours */}
        <div className="space-y-2">
          <Label htmlFor="hours">
            Hours <span className={errors.hours ? "text-red-500" : "text-black"}>*</span>
          </Label>
          <div className="flex items-center gap-0">
            <button
              type="button"
              onClick={decrementHours}
              className="flex items-center justify-center text-[#111928] transition-colors hover:bg-[#E5E7EB] cursor-pointer w-[34px] h-[37px] bg-[#F3F4F6] border border-[#D1D5DB] rounded-l-lg px-3 py-2"
              aria-label="Decrease hours"
            >
              −
            </button>
            <input
              id="hours"
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              min="0"
              max="24"
              step="1"
              aria-label="Hours"
              className="text-center focus:outline-none w-[80px] h-[37px] bg-white text-[#6B7280] border-y border-[#D1D5DB] px-3 py-2 text-base font-sans font-normal"
            />
            <button
              type="button"
              onClick={incrementHours}
              className="flex items-center justify-center text-[#111928] transition-colors hover:bg-[#E5E7EB] cursor-pointer w-[34px] h-[37px] bg-[#F3F4F6] border border-[#D1D5DB] rounded-r-lg px-3 py-2"
              aria-label="Increase hours"
            >
              +
            </button>
          </div>
          {errors.hours && <p className="text-xs text-[#F05252]">{errors.hours}</p>}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t border-[#F3F4F6]">
          <Button type="submit" className="flex-1">
            Add entry
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1 border-[#E5E7EB] bg-white text-[#111928] hover:bg-[#F3F4F6] cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
