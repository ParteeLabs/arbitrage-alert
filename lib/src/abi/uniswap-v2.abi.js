"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerABI = void 0;
exports.routerABI = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
        ],
        name: 'getAmountsOut',
        outputs: [
            {
                internalType: 'uint256[]',
                name: 'amounts',
                type: 'uint256[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
