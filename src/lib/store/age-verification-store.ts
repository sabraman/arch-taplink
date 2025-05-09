import { create } from "zustand";

// Verification duration in milliseconds (15 minutes)
const VERIFICATION_DURATION = 15 * 60 * 1000;

interface AgeVerificationState {
	isVerified: boolean;
	isDialogOpen: boolean;
	setDialogOpen: (open: boolean) => void;
	verifyAge: () => void;
	checkVerification: () => void;
}

export const useAgeVerificationStore = create<AgeVerificationState>(
	(set, get) => ({
		isVerified: false,
		isDialogOpen: false,

		setDialogOpen: (open) => set({ isDialogOpen: open }),

		verifyAge: () => {
			// Store verification timestamp in localStorage
			localStorage.setItem(
				"age-verified-timestamp",
				new Date().getTime().toString(),
			);
			set({ isVerified: true, isDialogOpen: false });
		},

		checkVerification: () => {
			const verifiedTimestamp = localStorage.getItem("age-verified-timestamp");

			if (!verifiedTimestamp) {
				set({ isVerified: false, isDialogOpen: true });
				return;
			}

			const now = new Date().getTime();
			const verifiedTime = Number.parseInt(verifiedTimestamp);

			// Check if verification has expired (15 minutes)
			if (now - verifiedTime > VERIFICATION_DURATION) {
				set({ isVerified: false, isDialogOpen: true });
				return;
			}

			// Still valid
			set({ isVerified: true, isDialogOpen: false });
		},
	}),
);
