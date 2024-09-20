import { Injectable } from '@nestjs/common';
import { CreateHederaDto } from './dto/create-hedera.dto';
import { AccountId, AccountInfoQuery, Client, Hbar, PrivateKey, TokenCreateTransaction, TokenInfoQuery } from '@hashgraph/sdk';

@Injectable()
export class HederaService {

  private client;
  private accountID;
  private privateID;

  constructor() {

    this.accountID = AccountId.fromString(process.env.ACCOUNT_ID);
    this.privateID = PrivateKey.fromString(process.env.PRIVATE_KEY);

    // Pre-configured client for test network (testnet)
    this.client = Client.forTestnet()

    //Set the operator with the account ID and private key
    this.client.setOperator(this.accountID, this.privateID);
  }

  async create(createHederaDto: CreateHederaDto) {
    let output = {
      'error': false,
      'token': null,
      'message': 'OK',
      'data': null
    };

    const transaction = await new TokenCreateTransaction()
      .setTokenName(createHederaDto.name)
      .setTokenSymbol(createHederaDto.symbol)
      .setTreasuryAccountId(this.accountID)
      .setInitialSupply(createHederaDto.supply_initial)
      .freezeWith(this.client);

    try {
      const signTx = await transaction.sign(this.privateID);

      //Sign the transaction with the client operator private key and submit it to a Hedera network
      const txResponse = await signTx.execute(this.client);

      //Get the receipt of the transaction
      const receipt = await txResponse.getReceipt(this.client);
      const tokenId = receipt.tokenId;

      //Get the token ID from the receipt
      output['token'] = tokenId.toString();
      output['error'] = false;
      output['message'] = 'OK';
    } catch (error) {
      output['token'] = null;
      output['error'] = true;
      output['message'] = error.message;
      output['data'] = error.stack;
    }


    return output;
  }

  async getTokenInfo(tokenId: string) {
    const query = new TokenInfoQuery()
      .setTokenId(tokenId);

    const info = await query.execute(this.client);

    return info;
  }

  async accountInfo() {
    const query = new AccountInfoQuery()
      .setAccountId(this.accountID);

    //Sign with client operator private key and submit the query to a Hedera network
    const accountInfo = await query.execute(this.client);

    //Print the account info to the console
    return accountInfo;
  }

  async getTokensByAccount() {
    let output = [];

    const accountInfo = await this.accountInfo();

    if (accountInfo.tokenRelationships !== null) {

      for (const [tokenId, info] of Object.entries(accountInfo.tokenRelationships.toJSON())) {
        let tokenDetail = await this.getTokenInfo(tokenId);

        output.push({
          'id': tokenId,
          'name': tokenDetail.name,
          'totalSupply': tokenDetail.totalSupply.toString()
        });
      }
    }

    return output;
  }
}
