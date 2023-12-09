import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoanRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loanRegistryABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'CloseLoanAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LoanAccountCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LoanDisbursed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_outstanding_balance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LoanPayment',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LoanPaymentReminder',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_borrower', internalType: 'address', type: 'address' },
      { name: '_asset_owner', internalType: 'address', type: 'address' },
      { name: '_asset_contract', internalType: 'address', type: 'address' },
      { name: '_asset_id', internalType: 'uint256', type: 'uint256' },
      { name: '_token_contract', internalType: 'address', type: 'address' },
    ],
    name: 'create_loan_account',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'deduct_emi',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_disbursement', internalType: 'uint256', type: 'uint256' },
      { name: '_time_period', internalType: 'uint256', type: 'uint256' },
      { name: '_payment_interval', internalType: 'uint256', type: 'uint256' },
      { name: '_interest_rate', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'disburse_loan',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'prepayment',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'remind_borrower',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

export const loanRegistryAddress =
  '0x82A947c0432dD0BA11e4ae0a8DB2df0cA8a096DD' as const

export const loanRegistryConfig = {
  address: loanRegistryAddress,
  abi: loanRegistryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RENAsset
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const renAssetABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'realEstateNftID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RealEstateForSale',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'realEstateNftID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'location',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'squareFeetArea',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'forSale', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'realEstateTokenURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RealEstateNFTCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'realEstateNftID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RealEstateSold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_realEstateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyRealEstate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAllRealEstates',
    outputs: [
      {
        name: '',
        internalType: 'struct RealEstateNft.RENft[]',
        type: 'tuple[]',
        components: [
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'squareFeetArea', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'forSale', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_realEstateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRealEstateById',
    outputs: [
      {
        name: '',
        internalType: 'struct RealEstateNft.RENft',
        type: 'tuple',
        components: [
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'squareFeetArea', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'forSale', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_squareFeetArea', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: 'realEstateTokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'mintRealEstate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_realEstateId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateRealEstateForSale',
    outputs: [],
  },
] as const

export const renAssetAddress =
  '0xD1a8622AB2d15F3bf603Ec33ba9cC93E06B60f68' as const

export const renAssetConfig = {
  address: renAssetAddress,
  abi: renAssetABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RENToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const renTokenABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

export const renTokenAddress =
  '0x44C551c7F86BB72ef88c076e75b1C4F8A494F220' as const

export const renTokenConfig = {
  address: renTokenAddress,
  abi: renTokenABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function useLoanRegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof loanRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof loanRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as UseContractReadConfig<
    typeof loanRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useLoanRegistryDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof loanRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof loanRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof loanRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useLoanRegistryGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof loanRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof loanRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<
    typeof loanRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"hasRole"`.
 */
export function useLoanRegistryHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof loanRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof loanRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<
    typeof loanRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useLoanRegistrySupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof loanRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof loanRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof loanRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function useLoanRegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof loanRegistryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, TFunctionName, TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"create_loan_account"`.
 */
export function useLoanRegistryCreateLoanAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'create_loan_account'
        >['request']['abi'],
        'create_loan_account',
        TMode
      > & { functionName?: 'create_loan_account' }
    : UseContractWriteConfig<
        typeof loanRegistryABI,
        'create_loan_account',
        TMode
      > & {
        abi?: never
        functionName?: 'create_loan_account'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'create_loan_account', TMode>(
    {
      abi: loanRegistryABI,
      address: loanRegistryAddress,
      functionName: 'create_loan_account',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"deduct_emi"`.
 */
export function useLoanRegistryDeductEmi<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'deduct_emi'
        >['request']['abi'],
        'deduct_emi',
        TMode
      > & { functionName?: 'deduct_emi' }
    : UseContractWriteConfig<typeof loanRegistryABI, 'deduct_emi', TMode> & {
        abi?: never
        functionName?: 'deduct_emi'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'deduct_emi', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'deduct_emi',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"disburse_loan"`.
 */
export function useLoanRegistryDisburseLoan<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'disburse_loan'
        >['request']['abi'],
        'disburse_loan',
        TMode
      > & { functionName?: 'disburse_loan' }
    : UseContractWriteConfig<typeof loanRegistryABI, 'disburse_loan', TMode> & {
        abi?: never
        functionName?: 'disburse_loan'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'disburse_loan', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'disburse_loan',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"grantRole"`.
 */
export function useLoanRegistryGrantRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof loanRegistryABI, 'grantRole', TMode> & {
        abi?: never
        functionName?: 'grantRole'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'grantRole', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'grantRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"prepayment"`.
 */
export function useLoanRegistryPrepayment<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'prepayment'
        >['request']['abi'],
        'prepayment',
        TMode
      > & { functionName?: 'prepayment' }
    : UseContractWriteConfig<typeof loanRegistryABI, 'prepayment', TMode> & {
        abi?: never
        functionName?: 'prepayment'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'prepayment', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'prepayment',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"remind_borrower"`.
 */
export function useLoanRegistryRemindBorrower<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'remind_borrower'
        >['request']['abi'],
        'remind_borrower',
        TMode
      > & { functionName?: 'remind_borrower' }
    : UseContractWriteConfig<
        typeof loanRegistryABI,
        'remind_borrower',
        TMode
      > & {
        abi?: never
        functionName?: 'remind_borrower'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'remind_borrower', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'remind_borrower',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useLoanRegistryRenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof loanRegistryABI, 'renounceRole', TMode> & {
        abi?: never
        functionName?: 'renounceRole'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'renounceRole', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'renounceRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useLoanRegistryRevokeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof loanRegistryABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof loanRegistryABI, 'revokeRole', TMode> & {
        abi?: never
        functionName?: 'revokeRole'
      } = {} as any,
) {
  return useContractWrite<typeof loanRegistryABI, 'revokeRole', TMode>({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'revokeRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function usePrepareLoanRegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"create_loan_account"`.
 */
export function usePrepareLoanRegistryCreateLoanAccount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof loanRegistryABI,
      'create_loan_account'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'create_loan_account',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof loanRegistryABI,
    'create_loan_account'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"deduct_emi"`.
 */
export function usePrepareLoanRegistryDeductEmi(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'deduct_emi'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'deduct_emi',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'deduct_emi'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"disburse_loan"`.
 */
export function usePrepareLoanRegistryDisburseLoan(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'disburse_loan'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'disburse_loan',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'disburse_loan'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareLoanRegistryGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'grantRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'grantRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"prepayment"`.
 */
export function usePrepareLoanRegistryPrepayment(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'prepayment'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'prepayment',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'prepayment'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"remind_borrower"`.
 */
export function usePrepareLoanRegistryRemindBorrower(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'remind_borrower'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'remind_borrower',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'remind_borrower'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareLoanRegistryRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'renounceRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'renounceRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link loanRegistryABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareLoanRegistryRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof loanRegistryABI, 'revokeRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof loanRegistryABI, 'revokeRole'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function useLoanRegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"CloseLoanAccount"`.
 */
export function useLoanRegistryCloseLoanAccountEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'CloseLoanAccount'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'CloseLoanAccount',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'CloseLoanAccount'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"LoanAccountCreated"`.
 */
export function useLoanRegistryLoanAccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'LoanAccountCreated'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'LoanAccountCreated',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'LoanAccountCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"LoanDisbursed"`.
 */
export function useLoanRegistryLoanDisbursedEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'LoanDisbursed'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'LoanDisbursed',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'LoanDisbursed'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"LoanPayment"`.
 */
export function useLoanRegistryLoanPaymentEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'LoanPayment'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'LoanPayment',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'LoanPayment'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"LoanPaymentReminder"`.
 */
export function useLoanRegistryLoanPaymentReminderEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'LoanPaymentReminder'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'LoanPaymentReminder',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'LoanPaymentReminder'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useLoanRegistryRoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'RoleAdminChanged'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'RoleAdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useLoanRegistryRoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'RoleGranted'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'RoleGranted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link loanRegistryABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useLoanRegistryRoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof loanRegistryABI, 'RoleRevoked'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof loanRegistryABI, 'RoleRevoked'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__.
 */
export function useRenAssetRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useRenAssetBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"getAllRealEstates"`.
 */
export function useRenAssetGetAllRealEstates<
  TFunctionName extends 'getAllRealEstates',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'getAllRealEstates',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"getApproved"`.
 */
export function useRenAssetGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"getRealEstateById"`.
 */
export function useRenAssetGetRealEstateById<
  TFunctionName extends 'getRealEstateById',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'getRealEstateById',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useRenAssetIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"name"`.
 */
export function useRenAssetName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"owner"`.
 */
export function useRenAssetOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useRenAssetOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useRenAssetSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"symbol"`.
 */
export function useRenAssetSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useRenAssetTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof renAssetABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof renAssetABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__.
 */
export function useRenAssetWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof renAssetABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, TFunctionName, TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"approve"`.
 */
export function useRenAssetApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof renAssetABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'approve', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"buyRealEstate"`.
 */
export function useRenAssetBuyRealEstate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'buyRealEstate'
        >['request']['abi'],
        'buyRealEstate',
        TMode
      > & { functionName?: 'buyRealEstate' }
    : UseContractWriteConfig<typeof renAssetABI, 'buyRealEstate', TMode> & {
        abi?: never
        functionName?: 'buyRealEstate'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'buyRealEstate', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'buyRealEstate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"mintRealEstate"`.
 */
export function useRenAssetMintRealEstate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'mintRealEstate'
        >['request']['abi'],
        'mintRealEstate',
        TMode
      > & { functionName?: 'mintRealEstate' }
    : UseContractWriteConfig<typeof renAssetABI, 'mintRealEstate', TMode> & {
        abi?: never
        functionName?: 'mintRealEstate'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'mintRealEstate', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'mintRealEstate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useRenAssetRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof renAssetABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'renounceOwnership', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useRenAssetSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof renAssetABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'safeTransferFrom', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useRenAssetSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof renAssetABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'setApprovalForAll', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useRenAssetTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof renAssetABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'transferFrom', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useRenAssetTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof renAssetABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'transferOwnership', TMode>({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"updateRealEstateForSale"`.
 */
export function useRenAssetUpdateRealEstateForSale<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renAssetABI,
          'updateRealEstateForSale'
        >['request']['abi'],
        'updateRealEstateForSale',
        TMode
      > & { functionName?: 'updateRealEstateForSale' }
    : UseContractWriteConfig<
        typeof renAssetABI,
        'updateRealEstateForSale',
        TMode
      > & {
        abi?: never
        functionName?: 'updateRealEstateForSale'
      } = {} as any,
) {
  return useContractWrite<typeof renAssetABI, 'updateRealEstateForSale', TMode>(
    {
      abi: renAssetABI,
      address: renAssetAddress,
      functionName: 'updateRealEstateForSale',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__.
 */
export function usePrepareRenAssetWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareRenAssetApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"buyRealEstate"`.
 */
export function usePrepareRenAssetBuyRealEstate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'buyRealEstate'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'buyRealEstate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'buyRealEstate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"mintRealEstate"`.
 */
export function usePrepareRenAssetMintRealEstate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'mintRealEstate'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'mintRealEstate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'mintRealEstate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareRenAssetRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareRenAssetSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareRenAssetSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareRenAssetTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareRenAssetTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renAssetABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renAssetABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renAssetABI}__ and `functionName` set to `"updateRealEstateForSale"`.
 */
export function usePrepareRenAssetUpdateRealEstateForSale(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof renAssetABI,
      'updateRealEstateForSale'
    >,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renAssetABI,
    address: renAssetAddress,
    functionName: 'updateRealEstateForSale',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof renAssetABI,
    'updateRealEstateForSale'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__.
 */
export function useRenAssetEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"Approval"`.
 */
export function useRenAssetApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useRenAssetApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"BatchMetadataUpdate"`.
 */
export function useRenAssetBatchMetadataUpdateEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'BatchMetadataUpdate'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'BatchMetadataUpdate',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'BatchMetadataUpdate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"MetadataUpdate"`.
 */
export function useRenAssetMetadataUpdateEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'MetadataUpdate'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'MetadataUpdate',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'MetadataUpdate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useRenAssetOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"RealEstateForSale"`.
 */
export function useRenAssetRealEstateForSaleEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'RealEstateForSale'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'RealEstateForSale',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'RealEstateForSale'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"RealEstateNFTCreated"`.
 */
export function useRenAssetRealEstateNftCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'RealEstateNFTCreated'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'RealEstateNFTCreated',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'RealEstateNFTCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"RealEstateSold"`.
 */
export function useRenAssetRealEstateSoldEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'RealEstateSold'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'RealEstateSold',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'RealEstateSold'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renAssetABI}__ and `eventName` set to `"Transfer"`.
 */
export function useRenAssetTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof renAssetABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renAssetABI,
    address: renAssetAddress,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof renAssetABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__.
 */
export function useRenTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"allowance"`.
 */
export function useRenTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useRenTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"decimals"`.
 */
export function useRenTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"name"`.
 */
export function useRenTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useRenTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useRenTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof renTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof renTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renTokenABI}__.
 */
export function useRenTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof renTokenABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof renTokenABI, TFunctionName, TMode>({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"approve"`.
 */
export function useRenTokenApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof renTokenABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof renTokenABI, 'approve', TMode>({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"transfer"`.
 */
export function useRenTokenTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renTokenABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof renTokenABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof renTokenABI, 'transfer', TMode>({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useRenTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof renTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof renTokenABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof renTokenABI, 'transferFrom', TMode>({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renTokenABI}__.
 */
export function usePrepareRenTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renTokenABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof renTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareRenTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renTokenABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareRenTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renTokenABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renTokenABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link renTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareRenTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof renTokenABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: renTokenABI,
    address: renTokenAddress,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof renTokenABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renTokenABI}__.
 */
export function useRenTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof renTokenABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as UseContractEventConfig<typeof renTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renTokenABI}__ and `eventName` set to `"Approval"`.
 */
export function useRenTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof renTokenABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renTokenABI,
    address: renTokenAddress,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof renTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link renTokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useRenTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof renTokenABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: renTokenABI,
    address: renTokenAddress,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof renTokenABI, 'Transfer'>)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function getLoanRegistry(
  config: Omit<GetContractArgs, 'abi' | 'address'>,
) {
  return getContract({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function readLoanRegistry<
  TAbi extends readonly unknown[] = typeof loanRegistryABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function writeLoanRegistry<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof loanRegistryABI, TFunctionName>,
        'abi' | 'address'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof loanRegistryABI, TFunctionName>,
        'abi' | 'address'
      >,
) {
  return writeContract({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof loanRegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function prepareWriteLoanRegistry<
  TAbi extends readonly unknown[] = typeof loanRegistryABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  >,
) {
  return prepareWriteContract({
    abi: loanRegistryABI,
    address: loanRegistryAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link loanRegistryABI}__.
 */
export function watchLoanRegistryEvent<
  TAbi extends readonly unknown[] = typeof loanRegistryABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi' | 'address'>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    {
      abi: loanRegistryABI,
      address: loanRegistryAddress,
      ...config,
    } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link renAssetABI}__.
 */
export function getRenAsset(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({ abi: renAssetABI, address: renAssetAddress, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link renAssetABI}__.
 */
export function readRenAsset<
  TAbi extends readonly unknown[] = typeof renAssetABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link renAssetABI}__.
 */
export function writeRenAsset<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof renAssetABI, TFunctionName>,
        'abi' | 'address'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof renAssetABI, TFunctionName>,
        'abi' | 'address'
      >,
) {
  return writeContract({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof renAssetABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link renAssetABI}__.
 */
export function prepareWriteRenAsset<
  TAbi extends readonly unknown[] = typeof renAssetABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  >,
) {
  return prepareWriteContract({
    abi: renAssetABI,
    address: renAssetAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link renAssetABI}__.
 */
export function watchRenAssetEvent<
  TAbi extends readonly unknown[] = typeof renAssetABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi' | 'address'>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    {
      abi: renAssetABI,
      address: renAssetAddress,
      ...config,
    } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link renTokenABI}__.
 */
export function getRenToken(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({ abi: renTokenABI, address: renTokenAddress, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link renTokenABI}__.
 */
export function readRenToken<
  TAbi extends readonly unknown[] = typeof renTokenABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link renTokenABI}__.
 */
export function writeRenToken<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof renTokenABI, TFunctionName>,
        'abi' | 'address'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof renTokenABI, TFunctionName>,
        'abi' | 'address'
      >,
) {
  return writeContract({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof renTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link renTokenABI}__.
 */
export function prepareWriteRenToken<
  TAbi extends readonly unknown[] = typeof renTokenABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  >,
) {
  return prepareWriteContract({
    abi: renTokenABI,
    address: renTokenAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link renTokenABI}__.
 */
export function watchRenTokenEvent<
  TAbi extends readonly unknown[] = typeof renTokenABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi' | 'address'>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    {
      abi: renTokenABI,
      address: renTokenAddress,
      ...config,
    } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}
