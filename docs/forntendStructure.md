<!-- // Example folder structure -->
src /
├── app /                   # Next.js 14 app directory
│   ├── page.tsx          # Home page
│   ├── dashboard /        # Dashboard routes
│   ├── profile /          # Profile routes
│   ├── treatments /       # Treatment routes
│   ├── sessions /         # Session routes
│   └── payments /         # Payment routes
├── components /
│   ├── layout /
│   │   ├── DashboardLayout.tsx
│   │   ├── Navigation.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── therapist /
│   │   ├── RegistrationForm.tsx
│   │   ├── PatientList.tsx
│   │   ├── TreatmentCreator.tsx
│   │   └── SessionManager.tsx
│   ├── patient /
│   │   ├── TherapistDirectory.tsx
│   │   ├── TreatmentHistory.tsx
│   │   ├── SessionHistory.tsx
│   │   └── PaymentProcessor.tsx
│   └── shared /
│       ├── IPFSUploader.tsx
│       ├── TransactionModal.tsx
│       ├── LoadingStates.tsx
│       └── ErrorHandling.tsx
├── constants /
│   └── abis /
│       ├── contracts.ts
│       ├── PhysioRegistry.json
│       ├── TreatmentManager.json
│       └── PaymentProcessor.json
└── hooks /                # Custom hooks
    ├── useAuth.ts
    ├── useIPFS.ts
    └── useContract.ts



//============================ src/constants/abis/PhysioRegistry.json ============================
{
    "abi": [
        // Your contract ABI here
    ],
        "address": "0x..." // Contract address for specific network
}



//============================ src/constants/contracts.ts ============================
import PhysioRegistryABI from './abis/PhysioRegistry.json';
import TreatmentManagerABI from './abis/TreatmentManager.json';
import PaymentProcessorABI from './abis/PaymentProcessor.json';

export const CONTRACTS = {
    PhysioRegistry: {
        address: PhysioRegistryABI.address,
        abi: PhysioRegistryABI.abi
    },
    TreatmentManager: {
        address: TreatmentManagerABI.address,
        abi: TreatmentManagerABI.abi
    },
    PaymentProcessor: {
        address: PaymentProcessorABI.address,
        abi: PaymentProcessorABI.abi
    }
};



<!-- //============================ src/hooks/useAuth.ts ============================ -->
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const useAuth = () => {
    const router = useRouter();
    const { connect, disconnect } = useConnect();
    const { address, isConnected } = useAccount();
};




<!-- //============================ src/hooks/useIPFS.ts ============================ -->
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const useIPFS = () => {
    const { address, isConnected } = useAccount();
};           




<!-- //============================ src/hooks/useContract.ts ============================ -->
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const useContract = () => {
    const { address, isConnected } = useAccount();
};   




<!-- //============================ src/components/layout/DashboardLayout.tsx ============================ -->
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIPFS } from '@/hooks/useIPFS';
import { useContract } from '@/hooks/useContract';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const { isConnected } = useAuth();
    const { ipfsData } = useIPFS();
    const { contractData } = useContract();
};